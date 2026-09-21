import { describe, expect, test } from "bun:test"
import { createBindingLookup } from "@opentui/keymap/extras"
import { TuiKeybind } from "../src/config/keybind"

describe("session.resume keybind", () => {
  test("defines default keybind and command mapping", () => {
    expect(TuiKeybind.Definitions.session_resume.description).toMatch(/resume/i)
    expect(TuiKeybind.Definitions.session_resume.default).toBe("none")
    expect(TuiKeybind.CommandMap.session_resume).toBe("session.resume")
  })

  test("parses default as disabled and accepts overrides", () => {
    const defaults = TuiKeybind.parse({})
    expect(defaults.session_resume).toBe("none")

    const overridden = TuiKeybind.parse({ session_resume: "<leader>R" })
    expect(overridden.session_resume).toBe("<leader>R")
  })

  test("resolves session.resume through the binding lookup", () => {
    const keybinds = TuiKeybind.parse({ session_resume: "<leader>R" })
    const lookup = createBindingLookup(TuiKeybind.toBindingConfig(keybinds), {
      commandMap: TuiKeybind.CommandMap,
      bindingDefaults: TuiKeybind.bindingDefaults(),
    })

    expect(lookup.has("session.resume")).toBe(true)
    expect(lookup.get("session.resume").length).toBeGreaterThan(0)
  })
})
