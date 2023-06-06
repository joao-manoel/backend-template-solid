import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { makeRegisterPermissionController } from '@infra/http/factories/controllers/RegisterPermissionControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/makeEnsureAuthenticatedMiddleware'
import express from 'express'

const permissionsRouter = express.Router()

permissionsRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

permissionsRouter.post('/', adaptRoute(makeRegisterPermissionController()))

export { permissionsRouter }

