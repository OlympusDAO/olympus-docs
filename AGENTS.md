# Olympus Documentation Repository

## Project Overview

This is the official documentation repository for OlympusDAO, built with Docusaurus 2. The site documents the Olympus protocol - a decentralized financial (DeFi) system that supports OHM, a treasury-backed, liquidity-enabling token on the Ethereum network.

**Key Technologies:**

- Docusaurus 2.4.1
- React 17.0.2
- TypeScript
- Emotion for styling
- KaTeX for math equations

## Development Commands

```bash
# Install dependencies
yarn

# Local development
yarn start

# Build production site
yarn build

# Type checking
yarn typecheck

# Clear cache
yarn clear

# Deploy (via CI/CD)
yarn deploy

# Generate contract documentation
./contracts.sh
```

## Project Structure

```text
├── docs/                    # All documentation content
│   ├── overview/           # Protocol overview and concepts
│   ├── basics/             # Basic concepts and introduction
│   ├── governance/         # Governance processes and info
│   ├── contracts/          # Technical contract documentation
│   ├── contracts-old/      # Legacy contract documentation
│   ├── security/           # Security information
│   ├── publications/       # Research papers
│   ├── literature-content/ # Literature and educational content
│   ├── legacy/            # Deprecated features
│   ├── get-involved/      # Community participation
│   ├── mechanics/         # Protocol mechanics
│   ├── partnership/       # Partnership information
│   ├── protocol-internals/ # Internal protocol details
│   ├── resources/         # Additional resources
│   └── user-guides/       # User guides and tutorials
├── src/                   # React components and styling
│   ├── components/        # Custom React components
│   ├── css/              # Custom CSS styling
│   └── pages/            # Custom pages
├── static/                # Static assets
│   ├── admin/            # Netlify CMS configuration
│   ├── gitbook/assets/   # Images and PDFs
│   └── img/              # Site images
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.js           # Documentation sidebar structure
└── package.json          # Dependencies and scripts
```

## Documentation Categories

### Overview (`/docs/overview/`)

Core protocol documentation:

- `00_intro.md` - What is Olympus?
- `01_tokens.md` - Token information
- `02_treasury.md` - Treasury overview
- `03_pol.md` - Protocol Owned Liquidity
- `04_cooler-loans.md` - Cooler loans system
- `05_emissions-manager.md` - Emissions management
- `06_yield-repurchase-facility.md` - Yield repurchase
- `07_cross-chain.md` - Cross-chain operations
- `08_range-bound.md` - Range bound stability

### Governance (`/docs/governance/`)

Governance processes and information:

- `00_governance.md` - Governance overview
- `01_proposal_lifecycle.md` - Proposal lifecycle
- `02_proposal_submission.md` - How to submit proposals

### Contracts (`/docs/contracts/`)

Contract addresses:

- `00_overview.md` - Contract system overview
- `01_addresses.md` - Contract addresses
- `02_docs` - Generated contract documentation

### Security (`/docs/security/`)

Security information:

- `01_roles.md` - Security roles and permissions
- `02_audits.md` - Audit reports and information
- `03_bugbounty.md` - Bug bounty program

### Publications (`/docs/publications/`)

Research papers and publications:

- `00_papers.md` - Papers overview
- `01_ohm-bond-paper.md` - OHM bond paper

### Legacy (`/docs/legacy/`)

Deprecated features and old documentation:

- Staking, bonding, flex loans
- Boosted liquidity vaults
- Policy and DAO processes

### Basics (`/docs/basics/`)

Basic concepts and introduction to Olympus:

- Getting started guides
- Fundamental concepts
- Protocol basics

### Get Involved (`/docs/get-involved/`)

Community participation and contribution:

- How to contribute
- Community guidelines
- Development participation

### Literature Content (`/docs/literature-content/`)

Educational content and literature:

- Protocol explainers
- Educational resources
- Concept documentation

### Mechanics (`/docs/mechanics/`)

Protocol mechanics and operations:

- Technical operations
- System mechanics
- Process documentation

### Partnership (`/docs/partnership/`)

Partnership information and collaboration:

- Partner programs
- Integration guides
- Collaboration details

### Protocol Internals (`/docs/protocol-internals/`)

Internal protocol details:

- Technical deep dives
- System architecture
- Internal processes

### User Guides (`/docs/user-guides/`)

User guides and tutorials:

- Step-by-step tutorials
- User documentation
- How-to guides

## Content Guidelines

### File Naming

- Use numbered prefixes for ordering (e.g., `00_intro.md`, `01_tokens.md`)
- Use hyphens for spaces in filenames
- Keep filenames descriptive but concise

### Formatting

- Use standard Markdown (.md) files
- Follow existing formatting conventions
- Use proper header hierarchy (H1, H2, H3, etc.)

### Sidebar Organization

- Update `sidebars.js` when adding new categories
- Use `type: "autogenerated"` for directory-based organization
- Maintain logical grouping of related content

## Writing Style

- Use clear and concise language to explain complex concepts
- Maintain a consistent tone and voice throughout the documentation
- Structure content logically with appropriate headings, subheadings, and lists
- Use examples and illustrations to aid understanding
- Write clear, concise, and grammatically correct content
- Ensure all information is accurate and up-to-date
- Tailor the content to the intended audience
- Provide clear and concise instructions that are easy to follow
- Use visuals to illustrate complex concepts and procedures

## Styling

### Theme Configuration

- Default light theme with dark mode support
- Custom color scheme in `src/css/custom.css`
- Brand colors: `#3F4552` (primary), `#FAFAFB` (light mode), etc.

### Code Highlighting

- Uses Prism for syntax highlighting
- Includes Solidity language support
- GitHub (light) and Dracula (dark) themes

## Technical Features

### Math Support

- KaTeX integration for mathematical equations
- Configure via `remark-math` and `rehype-katex` plugins

### Image Management

- Store images in `/static/gitbook/assets/`
- Reference with absolute paths from root
- Supports SVG, PNG, PDF formats

### SEO and Analytics

- Google Tag Manager integration (GTM-NJSWZX5)
- Proper meta tags and structured data
- Custom favicon and social sharing images

## Deployment

- **Production**: <https://docs.olympusdao.finance/>
- **CI/CD**: Automated builds via Fleek
- **PRs**: Automatically deployed to preview environments

## Important Notes

1. **TypeScript**: The project uses TypeScript for type safety
2. **Custom Sidebar**: Manual sidebar configuration in `sidebars.js`
3. **Math Support**: Full KaTeX integration for equations
4. **Legacy Content**: Maintains documentation for deprecated features
