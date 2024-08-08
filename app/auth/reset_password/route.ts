import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createClient();

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        console.log(error)

        if (error) {
            return NextResponse.redirect(`${requestUrl.origin}/auth/password/reset`);
        }
    }

    console.log("everything went fine, user should be redirected to /auth/password/update")
    console.log(requestUrl.origin)
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${requestUrl.origin}/auth/password/update`);
}
