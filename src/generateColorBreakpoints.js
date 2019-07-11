import chroma from 'chroma-js'
// {
//   paletteName: "Flat UI Colors Aussie",
//   id: "flat-ui-colors-aussie",
//   emoji: "🇦🇺",
//   colors: [
//     { name: "Beekeeper", color: "#f6e58d" },
//     { name: "SpicedNectarine", color: "#ffbe76" },
//     { name: "PinkGlamour", color: "#ff7979" },
//     { name: "JuneBud", color: "#badc58" },
//     { name: "CoastalBreeze", color: "#dff9fb" },
//     { name: "Turbo", color: "#f9ca24" },
//     { name: "QuinceJelly", color: "#f0932b" },
//     { name: "CarminePink", color: "#eb4d4b" },
//     { name: "PureApple", color: "#6ab04c" },
//     { name: "HintOfIcePack", color: "#c7ecee" },
//     { name: "MiddleBlue", color: "#7ed6df" },
//     { name: "Heliotrope", color: "#e056fd" },
//     { name: "ExodusFruit", color: "#686de0" },
//     { name: "DeepKoamaru", color: "#30336b" },
//     { name: "SoaringEagle", color: "#95afc0" },
//     { name: "GreenlandGreen", color: "#22a6b3" },
//     { name: "SteelPink", color: "#be2edd" },
//     { name: "Blurple", color: "#4834d4" },
//     { name: "DeepCove", color: "#130f40" },
//     { name: "WizardGrey", color: "#535c68" }
//   ]
// }

const generateColorBreakpoints = paletteObj => {
  const colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  const newColorPalette = {
    paletteName: paletteObj.paletteName,
    id: paletteObj.id,
    emoji: paletteObj.emoji,
    colors: {}
  }
  colorLevels.forEach(colorLevel => newColorPalette.colors[colorLevel] = [])
  paletteObj.colors.forEach(colorObj => {
    let generatedColorLevels = genColorScale(colorObj.color, 10)
    generatedColorLevels.forEach((generatedColor, index) => {
      newColorPalette.colors[colorLevels[index]].push({
        name: `${colorObj.name}-${colorLevels[index]}`,
        id: colorObj.name.toLowerCase().replace(/ /g, '-'),
        hex: generatedColor,
        rgb: chroma(generatedColor).css(),
        rgba: chroma(generatedColor).css().replace('rgb', 'rgba').replace(')', ',1.0)')
      })
    })
  })
  return newColorPalette
}

const genColorScale = (colorHex, numberOfSteps) => {
  return chroma.scale(['#fff', colorHex, chroma(colorHex).darken(1.4).hex()]).mode('lab').colors(numberOfSteps)
}

export default generateColorBreakpoints