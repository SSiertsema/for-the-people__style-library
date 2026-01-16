<script setup lang="ts">
import Message from '@components/Message/Message.vue'
import '@components/Message/Message.scss'

const componentProps = [
  { name: 'severity', type: 'String', default: '"info"', description: 'Severity style: success, info, warn, error' },
  { name: 'closable', type: 'Boolean', default: 'false', description: 'Whether to show a close button' },
  { name: 'icon', type: 'Boolean', default: 'true', description: 'Whether to show the severity icon' },
  { name: 'life', type: 'Number', default: 'null', description: 'Duration in milliseconds before auto-hiding' }
]

const events = [
  { name: 'close', description: 'Emitted when the message is closed' },
  { name: 'life-end', description: 'Emitted when the auto-hide timer completes' }
]

const slots = [
  { name: 'default', description: 'The message content' },
  { name: 'icon', description: 'Custom icon slot' },
  { name: 'closeicon', description: 'Custom close icon slot' },
  { name: 'container', description: 'Full custom content wrapper' }
]

const closedMessages = ref<Set<string>>(new Set())

function resetMessage(key: string) {
  closedMessages.value.delete(key)
  closedMessages.value = new Set(closedMessages.value)
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Message"
      description="Message component for displaying inline feedback messages with different severity levels."
    />

    <ComponentDemo
      name="Message"
      description="Display feedback messages to users with contextual styling."
      :props="componentProps"
    >
      <div class="demo-section">
        <h4>All Severities</h4>
        <div class="demo-stack">
          <Message severity="success">
            Success! Your changes have been saved successfully.
          </Message>
          <Message severity="info">
            Info: This is an informational message for the user.
          </Message>
          <Message severity="warn">
            Warning! Please review your input before proceeding.
          </Message>
          <Message severity="error">
            Error: Something went wrong. Please try again.
          </Message>
        </div>
      </div>

      <div class="demo-section">
        <h4>Closable Messages</h4>
        <div class="demo-stack">
          <Message v-if="!closedMessages.has('closable-success')" severity="success" closable @close="closedMessages.add('closable-success')">
            Click the X to close this success message.
          </Message>
          <Message v-if="!closedMessages.has('closable-info')" severity="info" closable @close="closedMessages.add('closable-info')">
            Click the X to close this info message.
          </Message>
          <Message v-if="!closedMessages.has('closable-warn')" severity="warn" closable @close="closedMessages.add('closable-warn')">
            Click the X to close this warning message.
          </Message>
          <Message v-if="!closedMessages.has('closable-error')" severity="error" closable @close="closedMessages.add('closable-error')">
            Click the X to close this error message.
          </Message>
          <button
            v-if="closedMessages.size > 0"
            class="reset-button"
            @click="closedMessages = new Set()"
          >
            Reset All Messages
          </button>
        </div>
      </div>

      <div class="demo-section">
        <h4>Without Icon</h4>
        <div class="demo-stack">
          <Message severity="success" :icon="false">
            A success message without an icon.
          </Message>
          <Message severity="info" :icon="false">
            An info message without an icon.
          </Message>
        </div>
      </div>

      <div class="demo-section">
        <h4>With Custom Content</h4>
        <div class="demo-stack">
          <Message severity="info">
            <div>
              <strong>Important Update</strong>
              <p style="margin: 4px 0 0 0;">Your subscription will expire in 7 days. Please renew to continue using our services.</p>
            </div>
          </Message>
          <Message severity="error" closable>
            <div>
              <strong>Validation Errors</strong>
              <ul style="margin: 4px 0 0 0; padding-left: 20px;">
                <li>Email address is required</li>
                <li>Password must be at least 8 characters</li>
              </ul>
            </div>
          </Message>
        </div>
      </div>
    </ComponentDemo>

    <section class="events-section">
      <h2>Events</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="slots-section">
      <h2>Slots</h2>
      <table class="props-table">
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
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
}

.demo-section {
  margin-bottom: var(--doc-space-l);

  h4 {
    margin: 0 0 var(--doc-space-s);
    font-size: 14px;
    color: var(--doc-text-muted);
  }
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--doc-space-m);
}

.reset-button {
  align-self: flex-start;
  padding: var(--doc-space-xs) var(--doc-space-m);
  background: var(--doc-surface-muted);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: var(--doc-surface-panel);
  }
}

.events-section,
.slots-section {
  margin-top: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-table {
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
