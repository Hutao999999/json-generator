const showcase = document.querySelector("#showcase")
const command = document.querySelector(".command")
const textInput = document.querySelector(".addeds .textContainer .text")
const selectorInput = document.querySelector(".addeds .selectorContainer .selector")
const scoreboardNameInput = document.querySelector(".addeds .scoreboardContainer .name .items")
const scoreboardScoreboardInput = document.querySelector(".addeds .scoreboardContainer .scoreboard .scoreboard")
const textAdd = document.querySelector(".addeds .textContainer .add")
const selectorAdd = document.querySelector(".addeds .selectorContainer .add")
const scoreboardAdd = document.querySelector(".addeds .scoreboardContainer .add")
const copy = document.querySelector(".buttons #copy")
const clear = document.querySelector(".buttons #clear")
const undo = document.querySelector(".buttons #undo")

let result = []

command.value = `{"rawtext":[]}`

const colorCode = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  "a": "#55FF55",
  "b": "#55FFFF",
  "c": "#FF5555",
  "d": "#FF55FF",
  "e": "#FFFF55",
  "f": "#FFFFFF",
  "g": "#DDD605",
  "h": "#E3D4D1",
  "i": "#CECACA",
  "j": "#443A3B",
  "m": "#971607",
  "n": "#B4684D",
  "p": "#DEB12D",
  "q": "#47A036",
  "s": "#2CBAA8",
  "t": "#21497B",
  "u": "#9A5CC6"
}

textAdd.addEventListener("click", ev => {
  if (textInput.value.length > 0) {
    result.push({
      text: textInput.value
    })

    textInput.value = ""
    reload()
  }
})

selectorAdd.addEventListener("click", ev => {
  if (selectorInput.value.length > 0) {
    result.push({
      selector: selectorInput.value.trim()
    })

    selectorInput.value = ""
    reload()
  }
})

scoreboardAdd.addEventListener("click", ev => {
  if (
    scoreboardNameInput.value.length > 0 &&
    scoreboardScoreboardInput.value.length > 0
  ) {
    result.push({
      score: {
        name: scoreboardNameInput.value,
        scoreboard: scoreboardScoreboardInput.value.trim()
      }
    })

    scoreboardNameInput.value = ""
    scoreboardScoreboardInput.value = ""
    reload()
  }
})

copy.addEventListener("click", ev => {
  command.select()
  document.execCommand("copy")
})

clear.addEventListener("click", ev => {
  result = []

  reload()
})

undo.addEventListener("click", ev => {
  result.splice(result.length - 1, 1)

  reload()
})

const reload = () => {
  command.value = `{"rawtext":${JSON.stringify(result).replaceAll("\\\\n", "\\n")}}`

  let newResult = new Array(result).flat()
  let strings = ""

  for (const item of newResult) {
    if (item.text) {
      strings += item.text
    } else if (item.selector) {
      if ([
        "@a",
        "@p",
        "@s",
        "@e",
        "@r"
      ].includes(item.selector)) {
        strings += "Dream"
      } else {
        strings += item.selector
      }
    } else if (item.score) {
      strings += "2147483647"
    }
  }

  let color = ""
  let bold = false
  let italics = false
  let random = false

  showcase.innerHTML = ""

  for (let i = 0; i < strings.length; i++) {
    if (
      strings[i] == "\\" ||
      strings[i - 1] == "\\"
    ) {
      if (
        strings[i - 1] == "\\" &&
        strings[i] == "n"
      ) {
        const br = document.createElement("br")
        showcase.appendChild(br)
      }
    } else {
      if (
        strings[i] == "§" ||
        strings[i - 1] == "§"
      ) {
        if (strings[i - 1] == "§") {
          if ("klor".includes(strings[i])) {
            if (strings[i] == "k") {
              random = true
            } else if (strings[i] == "l") {
              bold = true
            } else if (strings[i] == "o") {
              italics = true
            } else if (strings[i] == "r") {
              random = false
              bold = false
              italics = false
              color = ""
            }
          } else {
            color = colorCode[strings[i]]
          }
        }
      } else {
        const string = document.createElement("span")

        if (bold) string.classList.add("bold")
        if (italics) string.classList.add("italics")
        if (color != "") string.style.color = color

        if (random) {
          const allStrings = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOQPRSTUVWXYZ0123456789!$%^&*()_+{}:\"<>?|-=[];'./,\\"
          string.innerHTML = allStrings[Math.floor(Math.random() * allStrings.length)]
        } else {
          string.innerHTML = strings[i]
        }

        showcase.appendChild(string)
      }
    }
  }
}
