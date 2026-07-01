# fi-business-id

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/mharj-fi-business-id.svg)](https://badge.fury.io/js/mharj-fi-business-id)
[![Maintainability](https://qlty.sh/gh/mharj/projects/fi-business-id/maintainability.svg)](https://qlty.sh/gh/mharj/projects/fi-business-id)
[![Code Coverage](https://qlty.sh/gh/mharj/projects/fi-business-id/coverage.svg)](https://qlty.sh/gh/mharj/projects/fi-business-id)
![CI](https://github.com/mharj/fi-business-id/actions/workflows/main.yml/badge.svg)

## Finnish Business ID (Y-tunnus) validation and creation

This module provides functions to validate and create Finnish Business IDs (Y-tunnus).
A Finnish Business ID consists of seven digits, a hyphen, and a checksum digit (e.g., 1234567-1).

### javascript/typescript module

```typescript
console.log(isValidBusinessId("1572860-0"));

console.log(buildBusinessId("1572860"));
// Checks if a given value (string, null, undefined) is a valid Finnish Business ID and returns it with the correct type.
const businessId: FiBusinessId = FiBusinessId("1572860-0");
```

### Browser Module

```html
<html>
	<head></head>
	<body>
		<script type="module">
			import {
				buildBusinessId,
				isValidBusinessId,
			} from "https://unpkg.com/mharj-fi-business-id@latest/dist/index.mjs";
			console.log(isValidBusinessId("1572860-0"));
			console.log(buildBusinessId("1572860"));
		</script>
	</body>
</html>
```
