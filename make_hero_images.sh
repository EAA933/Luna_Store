#!/bin/bash
set -e

# Target canvas size: 1920x1080 (same aspect ratio as Hero container)

# ==========================================
# 1. DUNA (Carey Ámbar Miel en Dunas de Arena)
# ==========================================
echo "Processing DUNA..."
# Background base: crop hero-sunset to 1920x1080
convert public/images/hero-sunset.jpg -gravity center -crop 1920x1080+0+0 +repage /tmp/duna-bg.jpg

# Resize glasses to 820px width
convert /tmp/glasses-duna.png -resize 820x /tmp/duna-glasses-resized.png

# Create realistic soft contact shadow
convert /tmp/duna-glasses-resized.png \
  -background black -shadow 80x28+0+32 \
  -background none -flatten /tmp/duna-shadow-soft.png

# Create sharp ambient occlusion contact shadow directly under rims
convert /tmp/duna-glasses-resized.png \
  -background "#200e04" -shadow 95x8+0+12 \
  -background none -flatten /tmp/duna-shadow-hard.png

# Composite DUNA:
# Position: centered horizontally (x = (1920-820)/2 = 550), y = 490
convert /tmp/duna-bg.jpg \
  /tmp/duna-shadow-soft.png -geometry +550+490 -composite \
  /tmp/duna-shadow-hard.png -geometry +550+490 -composite \
  /tmp/duna-glasses-resized.png -geometry +550+490 -composite \
  -quality 95 public/images/model-duna-v3.jpg

# ==========================================
# 2. MAREA (Verde Salvia Marino en Costa Marina)
# ==========================================
echo "Processing MAREA..."
# Background base: crop hero-ocean to 1920x1080
convert public/images/hero-ocean.jpg -gravity center -crop 1920x1080+0+0 +repage /tmp/marea-bg.jpg

# Resize glasses to 820px width
convert /tmp/glasses-marea.png -resize 820x /tmp/marea-glasses-resized.png

# Create soft wet-ground shadow
convert /tmp/marea-glasses-resized.png \
  -background "#011414" -shadow 80x28+0+32 \
  -background none -flatten /tmp/marea-shadow-soft.png

# Hard contact shadow
convert /tmp/marea-glasses-resized.png \
  -background "#010c0c" -shadow 95x8+0+12 \
  -background none -flatten /tmp/marea-shadow-hard.png

# Composite MAREA:
convert /tmp/marea-bg.jpg \
  /tmp/marea-shadow-soft.png -geometry +550+490 -composite \
  /tmp/marea-shadow-hard.png -geometry +550+490 -composite \
  /tmp/marea-glasses-resized.png -geometry +550+490 -composite \
  -quality 95 public/images/model-marea-v3.jpg

# ==========================================
# 3. OCASO (Cobre Aviador en Atardecer Crepuscular)
# ==========================================
echo "Processing OCASO..."
# Background base: crop hero-lifestyle to 1920x1080
convert public/images/hero-lifestyle.jpg -gravity center -crop 1920x1080+0+0 +repage /tmp/ocaso-bg.jpg

# Resize glasses to 820px width
convert /tmp/glasses-ocaso.png -resize 820x /tmp/ocaso-glasses-resized.png

# Soft sunset shadow
convert /tmp/ocaso-glasses-resized.png \
  -background "#1f0902" -shadow 80x28+0+32 \
  -background none -flatten /tmp/ocaso-shadow-soft.png

# Hard contact shadow
convert /tmp/ocaso-glasses-resized.png \
  -background "#140401" -shadow 95x8+0+12 \
  -background none -flatten /tmp/ocaso-shadow-hard.png

# Composite OCASO:
convert /tmp/ocaso-bg.jpg \
  /tmp/ocaso-shadow-soft.png -geometry +550+490 -composite \
  /tmp/ocaso-shadow-hard.png -geometry +550+490 -composite \
  /tmp/ocaso-glasses-resized.png -geometry +550+490 -composite \
  -quality 95 public/images/model-ocaso-v3.jpg

echo "All images generated successfully!"
identify public/images/model-*-v3.jpg
