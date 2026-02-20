#!/usr/bin/env python3
# Generate minimal valid PNG icon files
import struct
import zlib
import os

def create_png(width, height, filename):
    """Create a minimal valid PNG file (solid blue square)"""
    
    # PNG signature
    png_sig = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk (image header)
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)  # 8-bit RGB
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT chunk (image data) - solid blue pixels
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter type
        for x in range(width):
            raw_data += b'\x25\x63\xeb'  # RGB: #2563eb (blue)
    
    compressed = zlib.compress(raw_data, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed) & 0xffffffff
    idat_chunk = struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    # IEND chunk (end marker)
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    # Write file
    with open(filename, 'wb') as f:
        f.write(png_sig + ihdr_chunk + idat_chunk + iend_chunk)
    print(f"Created {filename}")

# Create icons directory if needed
os.makedirs('icons', exist_ok=True)

# Generate PNG files for each size
sizes = [72, 96, 128, 144, 152, 192, 384, 512]
for size in sizes:
    create_png(size, size, f'icons/icon-{size}x{size}.png')

print("All icon files generated successfully!")
