import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResposne = await this.controller.handle(httpRequest)
    if (httpResposne.statusCode === 500) {
      await this.logErrorRepository.logError(httpResposne.body.stack)
    }
    return httpResposne
  }
}
