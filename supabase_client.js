import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'


const supabaseUrl = 'https://cburolnykagrisqerphu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidXJvbG55a2FncmlzcWVycGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NDQzOTMsImV4cCI6MTk5MjMyMDM5M30.YtNhSxX5npaiwiiH3zq9wh5yQfDO7t3sbGyVzxcRuaw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})