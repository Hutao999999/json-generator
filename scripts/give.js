const command = document.querySelector("#command")
const canPlaceOnInput = document.querySelector(".canPlaceOnContainer #canPlaceOn")
const canDestroyInput = document.querySelector(".canDestroyContainer #canDestroy")
const canPlaceOnButton = document.querySelector(".canPlaceOnContainer .add")
const canDestroyButton = document.querySelector(".canDestroyContainer .add")
const keepOnDeath = document.querySelector(".keepOnDeathContainer #keepOnDeath")
const lockMode = document.querySelector("#lockMode")
const copy = document.querySelector(".buttons #copy")
const clear = document.querySelector(".buttons #clear")
const undo = document.querySelector(".buttons #undo")

command.value = "{}"

let result = {}
let order = []

canPlaceOnButton.addEventListener("click", ev => {
  if (canPlaceOnInput.value.trim().length > 0) {
    result["can_place_on"] ??= {
      blocks: []
    }

    if (!result["can_place_on"].blocks.includes(canPlaceOnInput.value.trim())) {
      result["can_place_on"].blocks.push(canPlaceOnInput.value.trim())
    }

    canPlaceOnInput.value = ""
    reload()
    order.push("canPlaceOn")
  }
})

canDestroyButton.addEventListener("click", ev => {
  if (canDestroyInput.value.trim().length > 0) {
    result["can_destroy"] ??= {
      blocks: []
    }

    if (!result["can_destroy"].blocks.includes(canDestroyInput.value.trim())) {
      result["can_destroy"].blocks.push(canDestroyInput.value.trim())
    }

    canDestroyInput.value = ""
    reload()
    order.push("canDestroy")
  }
})

keepOnDeath.addEventListener("change", ev => {
  if (keepOnDeath.checked) {
    result["keep_on_death"] = {}
    reload()
  } else {
    delete result["keep_on_death"]
    reload()
  }
})

lockMode.addEventListener("change", ev => {
  if (lockMode.value == "Lock Mode") {
    delete result["item_lock"]
    reload()
  } else {
    if (lockMode.value == "Lock in slot") {
      result["item_lock"] = {
        mode: "lock_in_slot"
      }

      reload()
    } else if (lockMode.value == "Lock in inventory") {
      result["item_lock"] = {
        mode: "lock_in_inventory"
      }

      reload()
    }
  }
})

copy.addEventListener("click", ev => {
  command.select()
  document.execCommand("copy")
})

clear.addEventListener("click", ev => {
  result = {}
  reload()
})

undo.addEventListener("click", ev => {
  if (order[order.length - 1] == "canPlaceOn") {
    result["can_place_on"].blocks.splice(result["can_place_on"].blocks.length - 1, 1)
    order.splice(order.length - 1, 1)

    if (result["can_place_on"].blocks.length == 0) {
      delete result["can_place_on"]
    }

    reload()
  } else if (order[order.length - 1] == "canDestroy") {
    result["can_destroy"].blocks.splice(result["can_destroy"].blocks.length - 1, 1)
    order.splice(order.length - 1, 1)

    if (result["can_destroy"].blocks.length == 0) {
      delete result["can_destroy"]
    }

    reload()
  }
})

const reload = () => {
  command.value = JSON.stringify(result)
}