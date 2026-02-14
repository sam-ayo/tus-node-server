import 'should'
import {strict as assert} from 'node:assert'
import path from 'node:path'
import {AzureStore} from '@tus/azure-store'
import type {TokenCredential} from '@azure/core-auth'
import * as shared from '../../../utils/dist/test/stores.js'

const fixturesPath = path.resolve('../', '../', 'test', 'fixtures')
const storePath = path.resolve('../', '../', 'test', 'output', 'azure-store')

describe('AzureStore', () => {
  describe('with Account key', () => {
    before(function () {
      this.testFileSize = 960_244
      this.testFileName = 'test.mp4'
      this.storePath = storePath
      this.testFilePath = path.resolve(fixturesPath, this.testFileName)
    })

    beforeEach(function () {
      this.datastore = new AzureStore({
        account: process.env.AZURE_ACCOUNT_ID as string,
        accountKey: process.env.AZURE_ACCOUNT_KEY as string,
        containerName: process.env.AZURE_CONTAINER_NAME as string,
      })
    })

    shared.shouldHaveStoreMethods()
    shared.shouldCreateUploads()
    // shared.shouldRemoveUploads() // Not implemented yet
    // shared.shouldExpireUploads() // Not implemented yet
    shared.shouldWriteUploads()
    shared.shouldHandleOffset()
    shared.shouldDeclareUploadLength() // Creation-defer-length extension
  })

  describe('constructor', () => {
    it('should accept a TokenCredential instead of accountKey', () => {
      const mockCredential: TokenCredential = {
        getToken: async () => ({
          token: 'mock-token',
          expiresOnTimestamp: Date.now() + 3600_000,
        }),
      }
      const store = new AzureStore({
        account: 'testaccount',
        containerName: 'testcontainer',
        credential: mockCredential,
      })
      assert.ok(store)
    })

    it('should throw when neither accountKey nor credential is provided', () => {
      assert.throws(
        () =>
          new AzureStore({
            account: 'testaccount',
            containerName: 'testcontainer',
          }),
        /accountKey or credential/
      )
    })

    it('should throw when account is missing', () => {
      assert.throws(
        () =>
          new AzureStore({
            account: '',
            containerName: 'test',
            accountKey: 'key',
          }),
        /account/
      )
    })

    it('should throw when containerName is missing', () => {
      assert.throws(
        () =>
          new AzureStore({
            account: 'test',
            containerName: '',
            accountKey: 'key',
          }),
        /container name/
      )
    })
  })
})
