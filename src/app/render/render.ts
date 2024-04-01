import { Mermaid } from "mermaid"
import { Browser } from "puppeteer-core"

export async function renderCode(
  browser: Browser
) {

  const page = await browser.newPage()

  page.on('console', async (msg) => {
    const msgArgs = msg.args()
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue())
    }
  })

  try {
    await page.goto('http://localhost:3010/mermaid.html')
    console.log("content set")
    // console.log(await page.content())
    // await page.$eval('#container', async () => {
    //   console.log("Container Found")
    //   // const { mermaid } = globalThis as any
    //   // console.log(mermaid)
    // })
    let x = false
    await page.$eval('body', (body, backgroundColor) => {
      body.style.background = backgroundColor
      x = true
    }, "red")

    console.log("Here", x)

    await page.waitForSelector('#container')
    const text = await page.evaluate(async () => {
      const { mermaid } = globalThis as unknown as { mermaid: Mermaid }

      const graphDefinition = 'graph TB\na-->b'
      const { svg } = await mermaid.render('graphDiv', graphDefinition)
      // console.log(svg)
      return svg

    })
    // console.log("Result:", text)
    console.log('end')

    return text
  } catch (error) {
    console.log(error)
  } finally {
    await page.close()
  }

  return 'nice'
}