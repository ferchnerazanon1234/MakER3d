import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return NextResponse.json({ error: `Firma no válida: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        const { error } = await supabase
            .from('orders')
            .update({ status: 'paid', updated_at: new Date() })
            .eq('id', orderId);

        if (error) {
            return NextResponse.json({ error: 'Error al actualizar base de datos' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}