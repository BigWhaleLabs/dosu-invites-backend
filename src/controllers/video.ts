import { Context } from 'koa'
import { Controller, Ctx, Get } from 'amala'

const videoData = {
  id: 'timelaps',
  poster: 'assets/poster.png',
  name: 'Dosu Invites Timelaps',
}

@Controller('/video')
export default class LoginController {
  @Get('/')
  getFramesWithAddresses(@Ctx() ctx: Context) {
    // 0. Read the video
    // 1. Cut video by frames
    // 2. Give each frame an eth address
    // Compose it into an object {frame: 1, eth:0x123avg }
    // Return it with video itself
  }
}
