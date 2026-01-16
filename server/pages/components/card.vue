<script setup lang="ts">
import Card from '@components/Card/Card.vue'
import '@components/Card/Card.scss'

const slots = [
  { name: 'header', description: 'Header content rendered at the top of the card' },
  { name: 'title', description: 'Title text within the card body' },
  { name: 'subtitle', description: 'Subtitle text below the title' },
  { name: 'content', description: 'Main body content of the card' },
  { name: 'default', description: 'Default slot, renders in content area if content slot is not used' },
  { name: 'footer', description: 'Footer content rendered at the bottom of the card' }
]
</script>

<template>
  <div class="page">
    <PageHeader
      title="Card"
      description="Card component for displaying content in a contained, elevated surface with optional header, title, subtitle, content, and footer sections."
    />

    <ComponentDemo
      name="Card"
      description="A flexible container component for grouping related content."
    >
      <div class="demo-section">
        <h4>Basic Card</h4>
        <div class="demo-row">
          <Card class="demo-card">
            <template #title>Card Title</template>
            <template #content>
              <p>This is the card content. You can put any content here including text, images, or other components.</p>
            </template>
          </Card>
        </div>
      </div>

      <div class="demo-section">
        <h4>Card with All Sections</h4>
        <div class="demo-row">
          <Card class="demo-card">
            <template #header>
              <img src="https://picsum.photos/seed/card/400/200" alt="Card header image" class="header-image" />
            </template>
            <template #title>Featured Article</template>
            <template #subtitle>Published on January 15, 2026</template>
            <template #content>
              <p>This card demonstrates all available slots including header, title, subtitle, content, and footer. The header typically contains an image or icon, while the footer contains actions.</p>
            </template>
            <template #footer>
              <div class="footer-actions">
                <button class="action-btn">Read More</button>
                <button class="action-btn action-btn--secondary">Share</button>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <div class="demo-section">
        <h4>Simple Content Only</h4>
        <div class="demo-row">
          <Card class="demo-card">
            <p>A card can contain just simple content without any title or header. This is useful for quick information blocks or notifications.</p>
          </Card>
        </div>
      </div>

      <div class="demo-section">
        <h4>Multiple Cards</h4>
        <div class="demo-grid">
          <Card>
            <template #title>Project Alpha</template>
            <template #subtitle>In Progress</template>
            <template #content>
              <p>Development of the new customer portal with enhanced security features.</p>
            </template>
          </Card>
          <Card>
            <template #title>Project Beta</template>
            <template #subtitle>Planning</template>
            <template #content>
              <p>Mobile application redesign focusing on accessibility improvements.</p>
            </template>
          </Card>
          <Card>
            <template #title>Project Gamma</template>
            <template #subtitle>Completed</template>
            <template #content>
              <p>Backend API migration to microservices architecture.</p>
            </template>
          </Card>
        </div>
      </div>
    </ComponentDemo>

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="slots-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="usage-section">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <!-- Basic card with title and content -->
  <Card>
    <template #title>Card Title</template>
    <template #content>
      <p>Card content goes here.</p>
    </template>
  </Card>

  <!-- Card with all sections -->
  <Card>
    <template #header>
      <img src="/image.jpg" alt="Header" />
    </template>
    <template #title>Title</template>
    <template #subtitle>Subtitle</template>
    <template #content>
      <p>Main content</p>
    </template>
    <template #footer>
      <button>Action</button>
    </template>
  </Card>

  <!-- Simple content card -->
  <Card>
    <p>Just simple content, no slots needed.</p>
  </Card>
</template>

<script setup>
import Card from "@components/Card/Card.vue"
import "@components/Card/Card.scss"
</script>'
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-xl);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doc-space-l);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--doc-space-l);
}

.demo-card {
  max-width: 400px;
  width: 100%;
}

.header-image {
  width: 100%;
  height: auto;
  display: block;
}

.footer-actions {
  display: flex;
  gap: var(--doc-space-s);
}

.action-btn {
  padding: var(--doc-space-xs) var(--doc-space-m);
  border-radius: var(--doc-radius-s);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--doc-border);
  background: var(--doc-surface-panel);
  color: var(--doc-text-default);
  transition: background-color 0.15s;

  &:hover {
    background: var(--doc-surface-muted);
  }

  &--secondary {
    background: transparent;
    border-color: transparent;

    &:hover {
      background: var(--doc-surface-muted);
    }
  }
}

.slots-section,
.usage-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.slots-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--doc-surface-panel);
  border-radius: var(--doc-radius-m);
  overflow: hidden;

  th, td {
    padding: var(--doc-space-s) var(--doc-space-m);
    text-align: left;
    border-bottom: 1px solid var(--doc-border);
  }

  th {
    background: var(--doc-surface-muted);
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--doc-text-muted);
  }

  td {
    font-size: 14px;
  }

  code {
    background: var(--doc-surface-muted);
    padding: var(--doc-space-3xs) var(--doc-space-2xs);
    border-radius: var(--doc-radius-xs);
    font-size: 13px;
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>
