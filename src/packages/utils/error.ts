// Clicar no botão para criar uma eleição sem dados - Error 1

// Clicar no botão de iniciar eleição sem selecionar eleição - Error 2

export class NotFound extends Error {
  public readonly statusCode: number;

  constructor(entity: string) {
    super(`${entity}: Página não foi encontrada`);
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  public readonly statusCode: number;

  constructor(data: string) {
    super(data);
    this.statusCode = 400;
  }
}
