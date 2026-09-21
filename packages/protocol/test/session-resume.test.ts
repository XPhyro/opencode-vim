import { describe, expect, test } from "bun:test"
import { HttpApi, HttpApiMiddleware, OpenApi } from "effect/unstable/httpapi"
import { makeSessionGroup } from "../src/groups/session"

class DummySessionLocation extends HttpApiMiddleware.Service<DummySessionLocation>()("DummySessionLocation") {}

describe("session.resume endpoint", () => {
  test("exposes POST /api/session/:sessionID/resume as v2.session.resume", () => {
    const api = HttpApi.make("test").add(makeSessionGroup(DummySessionLocation))
    const spec = OpenApi.fromApi(api)
    const paths = spec.paths ?? {}

    const resume = paths["/api/session/{sessionID}/resume"] as any
    expect(resume).toBeDefined()
    expect(resume?.post?.operationId).toBe("v2.session.resume")
  })
})
