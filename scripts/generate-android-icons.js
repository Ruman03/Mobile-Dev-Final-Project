// Script to generate Android app icons from source logo
// Run with: node scripts/generate-android-icons.js

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Source logo
const SOURCE_LOGO = path.join(__dirname, '..', 'Logo', 'logo without text.png');

// Android adaptive icons require a larger canvas than the visible area.
// Android crops the icon into a circle and can also pan/scale it during
// parallax animations. The standard safe zone is 72dp inside a 108dp canvas,
// meaning the outer 18dp on each side can get clipped.
//
// To handle this properly we generate at 1.5x the target size (108/72 = 1.5),
// place the logo in the center, and let Android do its own circular crop.
// This way the dark background bleeds to the edges and there's no visible square.
const CANVAS_SCALE = 1.5;

// What percentage of the VISIBLE area (the inner 72dp) the logo should fill.
// 0.65 = logo takes up 65% of what you actually see after Android crops.
const LOGO_FILL = 0.65;

const ANDROID_ICONS = [
    { folder: 'mipmap-mdpi', size: 48, foregroundSize: 108 },
    { folder: 'mipmap-hdpi', size: 72, foregroundSize: 162 },
    { folder: 'mipmap-xhdpi', size: 96, foregroundSize: 216 },
    { folder: 'mipmap-xxhdpi', size: 144, foregroundSize: 324 },
    { folder: 'mipmap-xxxhdpi', size: 192, foregroundSize: 432 },
];

const ANDROID_RES_PATH = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

function circularMaskSVG(size) {
    return Buffer.from(
        `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="black"/>
        </svg>`
    );
}

async function generateIcons() {
    console.log('🎨 Generating Android app icons...\n');

    if (!fs.existsSync(SOURCE_LOGO)) {
        console.error('❌ Source logo not found:', SOURCE_LOGO);
        process.exit(1);
    }

    const trimmedMeta = await sharp(SOURCE_LOGO).trim().metadata();
    console.log(`📁 Source: ${SOURCE_LOGO}`);
    console.log(`   Trimmed logo content: ${trimmedMeta.width}x${trimmedMeta.height}px`);
    console.log('📁 Output:', ANDROID_RES_PATH);
    console.log('');

    for (const icon of ANDROID_ICONS) {
        const outputDir = path.join(ANDROID_RES_PATH, icon.folder);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, 'ic_launcher.png');
        const outputPathRound = path.join(outputDir, 'ic_launcher_round.png');

        // The full canvas is 1.5x the target size so the background bleeds
        // past the edges when Android crops it into a circle
        const canvasSize = Math.round(icon.size * CANVAS_SCALE);

        // The logo itself is sized relative to the original target (the visible area),
        // not the oversized canvas
        const logoSize = Math.round(icon.size * LOGO_FILL);

        try {
            // Step 1: Trim source and resize the logo to the target logo size
            const logoBuffer = await sharp(SOURCE_LOGO)
                .trim()
                .resize(logoSize, logoSize, {
                    fit: 'contain',
                    position: 'center',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toBuffer();

            // Step 2: Create the oversized canvas with the dark background,
            // composite the logo dead center. The background now extends well
            // past the edges so Android's circular crop won't reveal anything
            // outside of it.
            const squareIcon = await sharp({
                create: {
                    width: canvasSize,
                    height: canvasSize,
                    channels: 4,
                    background: { r: 10, g: 14, b: 26, alpha: 1 } // #0A0E1A
                }
            })
                .composite([{
                    input: logoBuffer,
                    gravity: 'center'
                }])
                .png()
                .toBuffer();

            // Step 3: For ic_launcher.png Android expects the exact target size,
            // so we center-crop the oversized canvas back down to it.
            // The background still bleeds to every edge cleanly.
            const finalSquare = await sharp(squareIcon)
                .resize(icon.size, icon.size, {
                    fit: 'cover',
                    position: 'center'
                })
                .png()
                .toBuffer();

            await fs.promises.writeFile(outputPath, finalSquare);

            // Step 4: Round icon — same as square but with a circular mask applied
            const roundIcon = await sharp(finalSquare)
                .composite([{
                    input: circularMaskSVG(icon.size),
                    blend: 'dest-in'
                }])
                .png()
                .toBuffer();

            await fs.promises.writeFile(outputPathRound, roundIcon);

            // Step 5: Generate foreground for adaptive icons (Android 8+)
            // Foreground is 108dp with logo in safe zone (66% inner area)
            const foregroundPath = path.join(outputDir, 'ic_launcher_foreground.png');
            const fgLogoSize = Math.round(icon.foregroundSize * 0.5); // Logo at 50% of foreground
            
            const fgLogoBuffer = await sharp(SOURCE_LOGO)
                .trim()
                .resize(fgLogoSize, fgLogoSize, {
                    fit: 'contain',
                    position: 'center',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toBuffer();

            const foregroundIcon = await sharp({
                create: {
                    width: icon.foregroundSize,
                    height: icon.foregroundSize,
                    channels: 4,
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent - background color is separate
                }
            })
                .composite([{
                    input: fgLogoBuffer,
                    gravity: 'center'
                }])
                .png()
                .toFile(foregroundPath);

            console.log(`✅ ${icon.folder}: ${icon.size}x${icon.size}px (foreground: ${icon.foregroundSize}px)`);
        } catch (error) {
            console.error(`❌ Error generating ${icon.folder}:`, error.message);
        }
    }

    console.log('\n🎉 Android icons generated successfully!');
    console.log('\n📝 Note: You may need to rebuild the app to see the new icons.');
    console.log('   Run: npx react-native run-android');
}

generateIcons();