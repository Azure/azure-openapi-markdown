// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { findReadMe } from "../findReadMe"
import * as vfs from "@ts-common/virtual-fs"

const readmePaths = [
    "https://github.com/Azure/azure-rest-api-specs/blob/master/specification/network/resource-manager/readme.md",
    vfs.pathJoin(vfs.pathResolve("."), "readme.md"),
]

jest.spyOn(vfs, "exists").mockImplementation((filename: string)  => {
    return Promise.resolve(readmePaths.includes(filename))
})

describe("findReadMe()", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("./", async () => {
        const readMePath = await findReadMe("./")
        expect(readMePath).not.toBe(undefined)
    })
    it("test/", async () => {
        const readMePath = await findReadMe("./test")
        expect(readMePath).not.toBe(undefined)
    })
    it("/", async () => {
        const readMePath = await findReadMe("/")
        expect(readMePath).toBe(undefined)
    })
    it("url", async () => {
        const url =
            "https://github.com/Azure/azure-rest-api-specs/blob/master/specification/network/resource-manager/Microsoft.Network/stable/2018-08-01"
        const readMePath = await findReadMe(url)
        expect(readMePath).toEqual("https://github.com/Azure/azure-rest-api-specs/blob/master/specification/network/resource-manager/readme.md")
    })
    it("url none", async () => {
        const url =
            "https://github.com/Azure/azure-rest-api-specs"
        const readMePath = await findReadMe(url)
        expect(readMePath).toBe(undefined)
    })
})
