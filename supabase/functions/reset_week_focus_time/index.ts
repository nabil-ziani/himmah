// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { createClient } from 'jsr:@supabase/supabase-js@2'
import 'https://deno.land/x/dotenv@v3.2.2/load.ts'

Deno.serve(async (req) => {
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Check of de request een POST-verzoek is
    if (req.method === "POST") {
        const { error } = await supabase
            .from('profiles')
            .update({ week_focus_time: 0 })
            .neq('week_focus_time', 0)

        // Controleer of er een fout is opgetreden
        if (error) {
            return new Response(
                JSON.stringify(error),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        // Bevestiging dat de reset succesvol is
        return new Response(
            JSON.stringify({ message: 'Focus times reset successfully' }),
            { headers: { "Content-Type": "application/json" } }
        );
    } else {
        // Behandel andere methoden
        return new Response(
            JSON.stringify({ message: 'Method not allowed' }),
            { status: 405, headers: { "Content-Type": "application/json" } }
        );
    }
})