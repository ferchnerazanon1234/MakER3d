'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function createCustomOrder(formData) {
    try {
        const productId = formData.get('productId');
        const filamentColor = formData.get('filamentColor');
        const finishId = formData.get('finishId');
        const file = formData.get('stlFile');

        if (!productId || !filamentColor || !file) {
            return { success: false, message: 'Faltan datos obligatorios para la impresión.' };
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileExtension = file.name.split('.').pop();
        const fileName = `models/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('print-files')
            .upload(fileName, fileBuffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) throw new Error(uploadError.message);

        const { data: urlData } = supabase.storage
            .from('print-files')
            .getPublicUrl(uploadData.path);

        return { 
            success: true, 
            message: 'Orden creada con éxito. Estado: Pendiente de revisión.',
            fileUrl: urlData.publicUrl 
        };

    } catch (error) {
        return { success: false, error: error.message };
    }
}