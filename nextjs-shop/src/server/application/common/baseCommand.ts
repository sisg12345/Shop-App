export class baseCommand {
  constructor(
    /** ページ */
    public readonly page: number | null,
    /** 件数 */
    public readonly limit: number | null,
    /** ソート */
    public readonly sort: string | null,
    /** 順序 */
    public readonly order: string | null,
  ) {
    this.order = order ?? 'desc'
  }
}
