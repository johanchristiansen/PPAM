import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://apezajbpflkqxwxacbzv.supabase.co'
const supabaseAnonKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZXphamJwZmxrcXh3eGFjYnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4ODM3ODEsImV4cCI6MjAzMTQ1OTc4MX0.0FEGg_xIm73ccCxxLuusp5rNzES4sfp0CCz3mwelvbA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})