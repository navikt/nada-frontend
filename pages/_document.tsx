import React from 'react'
import MyApp from './_app'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import type { AppProps } from 'next/app'

import { getDataFromTree } from '@apollo/react-ssr'

import { getApolloClient } from '../lib/apollo'

type DocumentProps = DocumentInitialProps & {
  apolloState: object
}

export default class extends Document<DocumentProps> {
  /**
   * Take the apolloState from apollo
   * (as generated in getInitialProps)
   * and assign them to __NEXT_DATA__ so that they
   * are accessible to the client for rehydration.
   */
  constructor(props: any) {
    super(props)

    const { apolloState, __NEXT_DATA__ } = props

    __NEXT_DATA__.apolloState = apolloState
  }

  /**
   * Called once on the initial app entry-point (server-side).
   *
   * @param {DocumentContext} ctx
   */
  static async getInitialProps(ctx: DocumentContext) {
    const apolloClient = getApolloClient(false, ctx?.req?.headers?.cookie)

    // render props
    const renderPage = ctx.renderPage
    const renderPageEnhancer = {
      enhanceApp: (App: any) =>
        function EnhanceApp(ctx: any) {
          return <MyApp {...ctx} />
        },
    }

    // swizzle render logic
    ctx.renderPage = () => renderPage(renderPageEnhancer)

    // run apollo before nextjs render
    await getDataFromTree(
      /* ctx.AppTree is App without appProps
       * and without being renderPageEnhanced */

      <ctx.AppTree pageProps={{ ...ctx }} apolloClient={apolloClient} />
    )

    // collect apollo state
    const apolloState = apolloClient.extract()

    // synchronously render page
    const documentProps = await Document.getInitialProps(ctx)

    return {
      apolloState,
      ...documentProps,
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
