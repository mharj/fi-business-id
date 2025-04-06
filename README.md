# fi-business-id

Finnish Business ID (Y-tunnus) validation and creation ![CI](https://github.com/mharj/fi-business-id/actions/workflows/main.yml/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/6613d01045f626d38df7/maintainability)](https://codeclimate.com/github/mharj/fi-business-id/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6613d01045f626d38df7/test_coverage)](https://codeclimate.com/github/mharj/fi-business-id/test_coverage)

This module provides functions to validate and create Finnish Business IDs (Y-tunnus).
A Finnish Business ID consists of seven digits, a hyphen, and a checksum digit (e.g., 1234567-1).

### javascript/typescript module

```typescript
console.log(isValidBusinessId('1572860-0'));

console.log(buildBusinessId('1572860'));
// Checks if a given value (string, null, undefined) is a valid Finnish Business ID and returns it with the correct type.
const businessId: FiBusinessId = FiBusinessId('1572860-0');
```

### Browser Module

```html
<html>
	<head></head>
	<body>
		<script type="module">
			import {buildBusinessId, isValidBusinessId} from 'https://unpkg.com/mharj-fi-business-id@latest/dist/index.mjs';
			console.log(isValidBusinessId('1572860-0'));
			console.log(buildBusinessId('1572860'));
		</script>
	</body>
</html>
```
