import { Command } from '@/server/application/user/get/command'
import { GetUserHandler } from '@/server/application/user/get/getUserHandler'
import { UserRepository } from '@/server/infrastructure/repositories/user/userRepository'
import { ResponseResult } from '@/types'
import { NextResponse } from 'next/server'

/**
 * ユーザー取得
 *
 * @param request リクエスト
 * @param param パラメーター
 * @returns
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // ユース〜ケースのインプットデータ
  const inputData = new Command(Number((await params).id))

  // ユースケース実行
  const result: ResponseResult = await new GetUserHandler(inputData, new UserRepository()).handle()

  // 結果返却
  return NextResponse.json(result)
}
