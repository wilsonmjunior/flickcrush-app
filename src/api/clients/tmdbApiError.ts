export class TMDBAPIError extends Error {
  public readonly status: number;
  public readonly isRateLimit: boolean;

  constructor(message: string, status: number, isRateLimit = false) {
    super(message);
    this.name = 'TMDBAPIError';
    this.status = status;
    this.isRateLimit = isRateLimit;
  }
}
