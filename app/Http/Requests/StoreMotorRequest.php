<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreMotorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:motors,name|max:255|string',
            'warna' => 'nullable|max:255|string',
            'plat_nomor' => 'required|unique:motors,plat_nomor|max:255|string',
            'harga' => 'required|numeric|min:0|max:9999999999999.99',
            'dp_minimum' => 'nullable|numeric|min:0|max:9999999999999.99',
            'odometer' => 'required|numeric|min:0|max:999999999.9',
            'deskripsi' => 'nullable|string|max:1000',
            'merek' => 'nullable|string',
            'kategori' => 'nullable|string',
            'url' => 'nullable|string',
            'masa_berlaku_pajak' => 'nullable|date',
            'tahun' => 'required|string',
            
            // Validasi untuk struktur files yang kompleks dengan base64
            'files' => 'required|array|min:1|max:10',
            'files.*.file' => 'required|array',
            'files.*.file.name' => 'required|string|max:255',
            'files.*.file.size' => [
                'required',
                'numeric',
                'max:10485760', // 10MB dalam bytes
            ],
            'files.*.file.type' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $allowedTypes = [
                        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
                        'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'
                    ];
                    
                    if (!in_array($value, $allowedTypes)) {
                        $fail('File harus berupa gambar (jpeg, jpg, png, gif, webp) atau video (mp4, avi, mov, wmv, flv, webm).');
                    }
                },
            ],
            'files.*.id' => 'required|string',
            'files.*.preview' => 'nullable|string',
            // Tambahkan validasi untuk base64 data
            'files.*.base64Data' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    // Validasi format base64
                    if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $value)) {
                        $fail('Invalid base64 data format.');
                    }
                    
                    // Cek apakah bisa di-decode
                    $decoded = base64_decode($value, true);
                    if ($decoded === false) {
                        $fail('Invalid base64 data.');
                    }
                },
            ],
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama motor wajib diisi.',
            'name.unique' => 'Nama motor sudah ada.',
            'plat_nomor.required' => 'Plat nomor wajib diisi.',
            'plat_nomor.unique' => 'Plat nomor sudah ada.',
            'harga.required' => 'Harga wajib diisi.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'odometer.required' => 'Odometer wajib diisi.',
            'tahun.required' => 'Tahun wajib diisi.',
            'files.required' => 'File wajib diupload.',
            'files.min' => 'Minimal upload 1 file.',
            'files.max' => 'Maksimal upload 10 file.',
            'files.*.file.required' => 'Data file tidak valid.',
            'files.*.file.name.required' => 'Nama file wajib ada.',
            'files.*.file.size.required' => 'Ukuran file wajib ada.',
            'files.*.file.size.max' => 'Ukuran file maksimal 10MB.',
            'files.*.file.type.required' => 'Tipe file wajib ada.',
            'files.*.id.required' => 'ID file wajib ada.',
            'files.*.base64Data.required' => 'Data file wajib ada.',
        ];
    }
}