<script setup lang="ts">
import { ref } from 'vue'
import Terminal from '@components/Terminal/Terminal.vue'
import '@components/Terminal/Terminal.scss'

const terminalRef = ref(null)

const props = [
  { name: 'prompt', type: 'String', default: '"$"', description: 'The prompt text displayed before each command' },
  { name: 'welcomeMessage', type: 'String', default: 'null', description: 'Optional welcome message shown at the top' },
  { name: 'ariaLabel', type: 'String', default: '"Terminal input"', description: 'Accessible label for the input field' }
]

const events = [
  { name: 'command', description: 'Emitted when a command is entered. Receives (text, respond) where respond is a callback to set the response.' }
]

const methods = [
  { name: 'addResponse(text)', description: 'Add a response to the last command' },
  { name: 'clear()', description: 'Clear all commands from the terminal' },
  { name: 'focusInput()', description: 'Focus the input field' }
]

const handleCommand = (text, respond) => {
  // Simulate command processing
  const commands = {
    help: 'Available commands: help, date, echo, clear',
    date: new Date().toLocaleString(),
    clear: () => {
      terminalRef.value?.clear()
      return null
    }
  }

  if (text.startsWith('echo ')) {
    respond(text.substring(5))
  } else if (text === 'clear') {
    terminalRef.value?.clear()
  } else if (commands[text]) {
    respond(commands[text])
  } else {
    respond(`Command not found: ${text}`)
  }
}
</script>

<template>
  <div class="page">
    <PageHeader
      title="Terminal"
      description="A terminal/console display component for command-line style interfaces."
    />

    <section class="demo-section">
      <h2>Interactive Terminal</h2>
      <p class="section-description">Try typing commands like "help", "date", "echo hello", or "clear".</p>
      <div class="demo-box">
        <Terminal
          ref="terminalRef"
          prompt="$"
          welcomeMessage="Welcome to the terminal. Type 'help' for available commands."
          @command="handleCommand"
          style="width: 100%; max-width: 600px;"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Prompt</h2>
      <p class="section-description">Terminal with a custom prompt symbol.</p>
      <div class="demo-box">
        <Terminal
          prompt=">"
          welcomeMessage="PowerShell-style terminal"
          @command="handleCommand"
          style="width: 100%; max-width: 600px;"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>Without Welcome Message</h2>
      <p class="section-description">A minimal terminal without a welcome message.</p>
      <div class="demo-box">
        <Terminal
          prompt="~"
          @command="handleCommand"
          style="width: 100%; max-width: 600px;"
        />
      </div>
    </section>

    <section class="usage">
      <h2>Usage</h2>
      <CodeSnippet
        language="vue"
        code='<template>
  <Terminal
    ref="terminalRef"
    prompt="$"
    welcomeMessage="Welcome! Type help for commands."
    @command="handleCommand"
  />
</template>

<script setup>
import { ref } from "vue"
import Terminal from "@components/Terminal/Terminal.vue"
import "@components/Terminal/Terminal.scss"

const terminalRef = ref(null)

const handleCommand = (text, respond) => {
  if (text === "help") {
    respond("Available commands: help, clear, date")
  } else if (text === "clear") {
    terminalRef.value?.clear()
  } else if (text === "date") {
    respond(new Date().toLocaleString())
  } else {
    respond(`Unknown command: ${text}`)
  }
}
</script>'
      />
    </section>

    <section class="props-section">
      <h2>Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code>{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>

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

    <section class="methods-section">
      <h2>Methods (via ref)</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in methods" :key="method.name">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--doc-space-xl);
  max-width: 1200px;
}

.demo-section {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-xs);
  }

  .section-description {
    color: var(--doc-text-muted);
    margin: 0 0 var(--doc-space-l);
  }
}

.demo-box {
  background: var(--doc-surface-panel);
  border: 1px solid var(--doc-border);
  border-radius: var(--doc-radius-m);
  padding: var(--doc-space-l);
  display: flex;
  justify-content: center;
}

.usage {
  margin-bottom: var(--doc-space-2xl);

  h2 {
    margin: 0 0 var(--doc-space-m);
  }
}

.props-section,
.events-section,
.methods-section {
  margin-bottom: var(--doc-space-2xl);

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
