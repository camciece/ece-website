'use client'

import { useMemo, useState } from 'react'

type Tab = 'text' | 'ids'

const tokenIds = [
  77370, 289, 16442, 30273, 26658, 47546, 124366, 270, 2730, 1503, 1648, 3757,
  3742, 111572, 33927, 771, 298, 901, 3321, 774,
]
const sampleTokens = [
  'Ghost',
  'ing',
  ' yap',
  'madığ',
  'ımı',
  ' ',
  'anlat',
  'an',
  ' ',
  'ik',
  'na',
  ' ',
  'ed',
  'ici',
  ' ',
  'bir',
  ' ',
  'mes',
  'aj',
  ' ',
  'yaz',
]
const sampleText = sampleTokens.join('')

export default function TokenDemo() {
  const [activeTab, setActiveTab] = useState<Tab>('text')
  const characters = useMemo(() => sampleText.length, [])

  return (
    <div className="tokenDemo">
      <header className="tokenDemo__stats">
        <div>
          <div className="tokenDemo__label">Tokens</div>
          <div className="tokenDemo__value">15</div>
        </div>
        <div>
          <div className="tokenDemo__label">Characters</div>
          <div className="tokenDemo__value">{characters}</div>
        </div>
      </header>

      <div className="tokenDemo__panel">
        {activeTab === 'ids' ? (
          <div className="tokenDemo__code">[{tokenIds.join(', ')}]</div>
        ) : (
          <div className="tokenDemo__tokens">
            {sampleTokens.map((token, index) => (
              <span key={`${token}-${index}`} className="tokenDemo__token">
                {token}
              </span>
            ))}
          </div>
        )}

        <div className="tokenDemo__tabs">
          <button
            type="button"
            className={`tokenDemo__tab ${
              activeTab === 'text' ? 'isActive' : ''
            }`}
            onClick={() => setActiveTab('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`tokenDemo__tab ${
              activeTab === 'ids' ? 'isActive' : ''
            }`}
            onClick={() => setActiveTab('ids')}
          >
            Token IDs
          </button>
        </div>
      </div>
    </div>
  )
}
