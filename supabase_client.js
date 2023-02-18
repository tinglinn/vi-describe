import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'


const supabaseUrl = 'https://jdkwthcuizrwzcpulkex.supabase.co/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impka3d0aGN1aXpyd3pjcHVsa2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2ODc4MzEsImV4cCI6MTk5MjI2MzgzMX0.-en284cJN0ui7W0CZc-hBV8he1nxJCZ47x2aEpijQgE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})