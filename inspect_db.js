const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Manually parse .env.local
const envFile = fs.readFileSync('./.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env variables in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function main() {
  console.log('Connecting to Supabase...');
  
  // 1. Get users from auth
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Error listing auth users:', authError);
    return;
  }
  
  console.log(`\nFound ${users.length} authenticated users.`);
  
  for (const user of users) {
    console.log(`\n--- User ID: ${user.id} (${user.email || 'Anonymous'}) ---`);
    
    // Check profiles
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (profError) {
      console.error('Error fetching profile:', profError.message);
    } else {
      console.log('Profile:', profile ? `Exists (username: ${profile.username})` : 'MISSING!');
    }
    
    // Check user_progress
    const { data: progress, error: progError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (progError) {
      console.error('Error fetching progress:', progError.message);
    } else {
      console.log('Progress:', progress ? `Exists (unlocked_characters keys: ${Object.keys(progress.unlocked_characters || {})})` : 'MISSING!');
    }
    
    // Check game_states
    const { data: runs, error: runsError } = await supabase
      .from('game_states')
      .select('*')
      .eq('user_id', user.id);
      
    if (runsError) {
      console.error('Error fetching game states:', runsError.message);
    } else {
      console.log(`Game States (runs): ${runs.length} total.`);
      const activeRuns = runs.filter(r => r.is_active);
      const inactiveRuns = runs.filter(r => !r.is_active);
      console.log(`- Active runs: ${activeRuns.length}`);
      console.log(`- Inactive runs: ${inactiveRuns.length}`);
      for (const run of inactiveRuns) {
        console.log(`  * Inactive Run ID: ${run.id}, Created: ${run.created_at}, Reason: ${run.history_logs?.game_over_reason}`);
      }
    }
  }
}

main();
