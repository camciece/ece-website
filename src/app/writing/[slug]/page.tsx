import Link from 'next/link'

export default async function Post() {
  return (
    <main className="writingPage">
      <article className="writingArticle">
        <header className="writingHeader">
          <div className="writingArticle__tag">AI</div>
          <h1 className="writingArticle__title">
            Notes on how large language models (LLMs) work
          </h1>
          <p className="writingArticle__deck">
            A clearer mental model for what’s really happening inside an LLM.
          </p>
          <div className="writingAuthor">
            <div className="writingAuthor__avatar" aria-hidden="true" />
            <div className="writingAuthor__info">
              <span>By Ece Çamcı</span>
              <span>Published on Monday, Jan 5, 2025</span>
            </div>
          </div>
        </header>

        <div className="writingHero writingHero--article">
          <div className="writingHeroFrame" />
        </div>

        <div className="writingBody">
          <p>
            I want to zoom in on LLM architecture — not the pricing mechanics,
            not caching. Just the core pipeline: tokens → embeddings →
            transformer → output. Once that pipeline feels concrete, everything
            else makes more sense.
          </p>
          <p>By the end of this post you will...</p>
          <ul>
            <li>Understand the four main stages of an LLM.</li>
            <li>See how text becomes numbers, then meaning.</li>
            <li>Build intuition for attention as a routing system.</li>
          </ul>

          <h2>LLM Architecture</h2>
          <p>
            At their core, LLMs are giant mathematical functions. They take a
            sequence of numbers as input, and produce a sequence of numbers as
            output. The graph of operations inside the model is enormous, but
            it&apos;s still made of a few repeatable blocks.
          </p>
          <p>
            A useful mental model is four stages: tokenize, embed, transform,
            decode. The model loops through these stages one token at a time
            until it decides to stop.
          </p>
          <pre>
            <code>{`prompt = "What is the meaning of life?";\n\n tokens = tokenizer(prompt);\n while (true) {\n \tembeddings = embed(tokens);\n \tfor ([attention, feedforward] of transformers) {\n \t\tembeddings = attention(embeddings);\n \t\tembeddings = feedforward(embeddings);\n \t}\n \toutput_token = output(embeddings);\n \tif (output_token === END_TOKEN) {\n \t\tbreak;\n \t}\n \ttokens.push(output_token);\n }\n\n print(decode(tokens));`}</code>
          </pre>

          <h2>Tokenizer</h2>
          <p>
            The tokenizer chops text into chunks and assigns each chunk an
            integer ID. It doesn&apos;t split perfectly by word — it splits by
            subword patterns.
          </p>
          <pre>
            <code>{`4383  Check\n842   out\n1657  ng\n17690 rok\n75584 .ai`}</code>
          </pre>
          <p>
            Tokens are the fundamental unit of input and output. The model never
            sees characters — only token IDs. Every response you get is built
            one token at a time.
          </p>

          <h2>Embedding</h2>
          <p>
            Tokens are integers, but the model needs a rich space to compare
            meaning. Embeddings map each token to a high-dimensional vector.
            Similar tokens cluster together in that space.
          </p>
          <pre>
            <code>{`// Created during training, never changes during inference.\nconst EMBEDDINGS = [...];\n\nfunction embed(tokens) {\n\treturn tokens.map(token => {\n\t\treturn EMBEDDINGS[token];\n\t});\n}`}</code>
          </pre>
          <p>
            Think of embeddings as coordinates. Training nudges those coordinates
            so related tokens live near one another, and unrelated ones drift
            apart. The more dimensions, the more nuance the model can store.
          </p>

          <h2>Transformer</h2>
          <p>
            The transformer stage mixes information across tokens. Attention is
            the mechanism that decides how much each token should influence the
            others. It&apos;s a routing system that keeps the model focused on what
            matters.
          </p>
          <p>
            If the prompt is &quot;Mary had a little&quot;, attention might weigh Mary
            heavily when predicting &quot;lamb&quot;. Those weights change at every step,
            and the model learns how to set them during training.
          </p>
          <p>
            After attention, a feedforward block transforms the mixed embeddings,
            and the process repeats for dozens of layers. The final layer
            produces probabilities over the vocabulary for the next token.
          </p>

          <h2>Decoding</h2>
          <p>
            The model samples a token from its probability distribution, appends
            it to the prompt, and loops. That loop is inference. It keeps going
            until a stop token appears or a maximum length is reached.
          </p>

          <h2>Conclusion</h2>
          <p>
            If you remember only one thing, remember the pipeline: tokenize,
            embed, transform, decode. Once you&apos;re fluent in that flow, every
            optimization and product decision in LLM land becomes easier to
            reason about.
          </p>
        </div>
      </article>

      <section className="closingSection">
        <div className="closingPanel">
          <div className="closingNav">
            <Link href="/writing">Writings</Link>
            <Link href="/meet-ece">Meet Ece</Link>
            <Link href="/recommendations">Recommendations</Link>
            <Link href="/heroes">Heroes</Link>
          </div>
          <div className="closingMeta">
            <div className="closingLinks">
              <Link href="/privacy">Privacy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/contact">Contact me</Link>
            </div>
            <div className="closingSocial">
              <a
                href="https://www.instagram.com/ececamci"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/ig.svg" alt="" />
              </a>
              <a
                href="https://www.youtube.com/@msececamci"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/yt.svg" alt="" />
              </a>
              <a
                href="https://www.linkedin.com/in/ececamci/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/in.svg" alt="" />
              </a>
            </div>
            <div className="closingCopyright">© 2025 Eces Notes</div>
          </div>
        </div>
      </section>
    </main>
  )
}
