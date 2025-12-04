---
title: "Ek47 – Payload Encryption with Environmental Keys"
speakers:
  - kevin-clark
  - skyler-knecht
startTime: "2024-10-26T19:55:00Z"
endTime: "2024-10-26T20:40:00Z"
track: "General Session"
room: "Main Hall"
eventSlug: "2024"
featured: false
---
Ek47 is a payload encryptor that leverages user-selected environmental keys associated with a target execution context. In the absence of these environmental keys, Ek47 payloads will not decrypt and execute. This creates a strong resistance to automated/manual analysis and reverse engineering of payloads. Ek47 supports many different environmental keys such as current user, domain, computer name, installed programs, and more. Additionally, Ek47 supports packing payloads of .NET assemblies, unmanaged DLLs, and raw shellcode. Ek47 payloads are themselves .NET assemblies and can be uploaded to disk or executed reflectively via any execute-assembly method. By default, a standard AMSI/ETW bypass is executed before the main payload is executed, but Ek47 makes it easy to add custom bypasses for more advanced evasion functionality. Additional features are provided such as entropy management, PE header stomping, and a variety of payload output formats.
