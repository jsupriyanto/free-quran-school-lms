import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';

// Configure route as dynamic for file uploads
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `user-photos/${timestamp}-${file.name}`;

    // Azure Blob Storage setup
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      return NextResponse.json({ error: 'Azure Storage connection string not configured' }, { status: 500 });
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = 'user-photos';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(`${timestamp}-${file.name}`);

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Azure Blob Storage
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type }
    });

    const url = `https://freequranschoolstorage.blob.core.windows.net/${containerName}/${timestamp}-${file.name}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}