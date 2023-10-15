// ./connections/signIn.ts

import { supabase } from './supabase'

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
    // options: {
    //     // redirectTo: getURL() // function to get your URL
    // }
  })
}
