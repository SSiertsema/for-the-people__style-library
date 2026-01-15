<script setup lang="ts">
const headings = [
  { name: 'Heading XXXL', size: 'xxxl', mixin: '@include typography("heading", "xxxl");' },
  { name: 'Heading XXL', size: 'xxl', mixin: '@include typography("heading", "xxl");' },
  { name: 'Heading XL', size: 'xl', mixin: '@include typography("heading", "xl");' },
  { name: 'Heading L', size: 'l', mixin: '@include typography("heading", "l");' },
  { name: 'Heading M', size: 'm', mixin: '@include typography("heading", "m");' },
  { name: 'Heading S', size: 's', mixin: '@include typography("heading", "s");' }
]

const texts = [
  { name: 'Text L', size: 'l', mixin: '@include typography("text", "l");' },
  { name: 'Text M', size: 'm', mixin: '@include typography("text", "m");' },
  { name: 'Text S', size: 's', mixin: '@include typography("text", "s");' }
]

const sampleHeading = 'The quick brown fox jumps over the lazy dog'
const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
</script>

<template>
  <div class="page">
    <PageHeader
      title="Typography"
      description="Typografie stijlen voor headings en body text. De typography mixin past automatisch responsive scaling toe."
          />

    <section class="usage">
      <h2>Gebruik</h2>
      <CodeSnippet
        language="scss"
        code='@use "@ftp/style-library/scss/mixins/typography" as *;

.my-heading {
  @include typography("heading", "xl");
}

.my-text {
  @include typography("text", "m");
}

// Voor static (non-responsive) typography:
.my-static-heading {
  @include static-typography("heading", "xl");
}'
      />
    </section>

    <section class="headings">
      <h2>Headings</h2>
      <div class="type-list">
        <PreviewFrame v-for="heading in headings" :key="heading.size" :title="heading.name">
          <div :class="`sample-heading-${heading.size}`">
            {{ sampleHeading }}
          </div>
          <CodeSnippet :code="heading.mixin" language="scss" />
        </PreviewFrame>
      </div>
    </section>

    <section class="texts">
      <h2>Text</h2>
      <div class="type-list">
        <PreviewFrame v-for="text in texts" :key="text.size" :title="text.name">
          <div :class="`sample-text-${text.size}`">
            {{ sampleText }}
          </div>
          <CodeSnippet :code="text.mixin" language="scss" />
        </PreviewFrame>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "mixins/typography" as *;

.page {
  padding: var(--doc-space-xl);
  max-width: 1000px;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.headings,
.texts {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-l);
  }
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

// Sample typography styles
.sample-heading-xxxl {
  @include typography('heading', 'xxxl');
  margin-bottom: var(--doc-space-m);
}

.sample-heading-xxl {
  @include typography('heading', 'xxl');
  margin-bottom: var(--doc-space-m);
}

.sample-heading-xl {
  @include typography('heading', 'xl');
  margin-bottom: var(--doc-space-m);
}

.sample-heading-l {
  @include typography('heading', 'l');
  margin-bottom: var(--doc-space-m);
}

.sample-heading-m {
  @include typography('heading', 'm');
  margin-bottom: var(--doc-space-m);
}

.sample-heading-s {
  @include typography('heading', 's');
  margin-bottom: var(--doc-space-m);
}

.sample-text-l {
  @include typography('text', 'l');
  margin-bottom: var(--doc-space-m);
}

.sample-text-m {
  @include typography('text', 'm');
  margin-bottom: var(--doc-space-m);
}

.sample-text-s {
  @include typography('text', 's');
  margin-bottom: var(--doc-space-m);
}
</style>
