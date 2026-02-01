'use client'

import { useState } from 'react'

type Tab = 'tokens' | 'embeddings'

const tokenNumbers = [75, 305, 284, 887]
export default function EmbeddingsDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('tokens')

  return (
    <div className="embeddingsDemo">
      <div className="embeddingsDemo__tabs" role="tablist">
        <button
          type="button"
          className={`embeddingsDemo__tab ${
            activeTab === 'tokens' ? 'isActive' : ''
          }`}
          role="tab"
          aria-selected={activeTab === 'tokens'}
          onClick={() => setActiveTab('tokens')}
        >
          Tokens
        </button>
        <button
          type="button"
          className={`embeddingsDemo__tab ${
            activeTab === 'embeddings' ? 'isActive' : ''
          }`}
          role="tab"
          aria-selected={activeTab === 'embeddings'}
          onClick={() => setActiveTab('embeddings')}
        >
          Embeddings
        </button>
      </div>

      <div className="embeddingsDemo__panel">
        {activeTab === 'tokens' ? (
          <div className="embeddingsDemo__tokens">
            <span className="embeddingsDemo__bracket">[</span>
            {tokenNumbers.map((value, index) => (
              <span key={`${value}-${index}`} className="embeddingsDemo__token">
                {value}
                {index < tokenNumbers.length - 1 ? (
                  <span className="embeddingsDemo__comma">,</span>
                ) : null}
              </span>
            ))}
            <span className="embeddingsDemo__bracket">]</span>
          </div>
        ) : (
          <div className="embeddingsDemo__imageWrap">
            <img
              className="embeddingsDemo__image"
              src="/download.png"
              alt="Embeddings visualization"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
