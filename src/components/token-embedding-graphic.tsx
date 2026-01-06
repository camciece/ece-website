'use client'

import { useId, useState } from 'react'

const defaultTokens = [75, 305, 284, 887]
const defaultEmbeddings = [
  [4.7, 1.0, 2.7],
  [1.5, 0.5, 3.9],
  [0.0, 0.5, 2.7],
  [0.1, 0.3, 3.7],
]

type TabKey = 'tokens' | 'embeddings'

type TokenEmbeddingGraphicProps = {
  tokens?: number[]
  embeddings?: number[][]
  title?: string
  id?: string
}

export default function TokenEmbeddingGraphic({
  tokens = defaultTokens,
  embeddings = defaultEmbeddings,
  title = 'Token vs Embedding',
  id,
}: TokenEmbeddingGraphicProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('tokens')
  const autoId = useId()
  const tabId = id ?? autoId

  return (
    <section className="writingGraphic" aria-label={title}>
      <div className="writingGraphic__tabs" role="tablist">
        <button
          type="button"
          className={`writingGraphic__tab ${activeTab === 'tokens' ? 'isActive' : ''}`}
          role="tab"
          aria-selected={activeTab === 'tokens'}
          aria-controls={`${tabId}-tokens`}
          id={`${tabId}-tokens-tab`}
          onClick={() => setActiveTab('tokens')}
        >
          Tokens
        </button>
        <button
          type="button"
          className={`writingGraphic__tab writingGraphic__tab--embed ${activeTab === 'embeddings' ? 'isActive' : ''}`}
          role="tab"
          aria-selected={activeTab === 'embeddings'}
          aria-controls={`${tabId}-embeddings`}
          id={`${tabId}-embeddings-tab`}
          onClick={() => setActiveTab('embeddings')}
        >
          Embeddings
        </button>
      </div>

      <div className="writingGraphic__panelWrap">
        <div
          id={`${tabId}-tokens`}
          role="tabpanel"
          aria-labelledby={`${tabId}-tokens-tab`}
          className={`writingGraphic__panel ${activeTab === 'tokens' ? 'isActive' : ''}`}
        >
          <div className="writingGraphic__tokens">
            <span className="writingGraphic__bracket">[</span>
            {tokens.map((token, index) => (
              <span key={`${token}-${index}`} className="writingGraphic__token">
                {token}
              </span>
            ))}
            <span className="writingGraphic__bracket">]</span>
          </div>
        </div>

        <div
          id={`${tabId}-embeddings`}
          role="tabpanel"
          aria-labelledby={`${tabId}-embeddings-tab`}
          className={`writingGraphic__panel ${activeTab === 'embeddings' ? 'isActive' : ''}`}
        >
          <div className="writingGraphic__embeddings">
            {embeddings.map((values, index) => (
              <div key={`embed-${index}`} className="writingGraphic__embedCard">
                {values.map((value, valueIndex) => (
                  <span
                    key={`${index}-${valueIndex}`}
                    className="writingGraphic__embedValue"
                  >
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
