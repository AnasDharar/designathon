def generate_ui_prompt(prompt: str, vibe_title: str, vibe_description: str | None, vibe_scores: dict | None) -> str:
    scores = vibe_scores or {}
    return f"""You are an expert UI designer.
Generate a single polished UI screen concept.

User intent:
{prompt}

Vibe:
- Title: {vibe_title}
- Description: {vibe_description or "No description provided."}
- Professionalism: {scores.get("professionalism", 0.5)}
- Warmth: {scores.get("warmth", 0.5)}
- Originality: {scores.get("originality", 0.5)}
- Visual density: {scores.get("visualDensity", 0.5)}
- Interaction energy: {scores.get("interactionEnergy", 0.5)}
- Accessibility bias: {scores.get("accessibilityBias", 0.5)}

Output requirements:
- Deliver one complete screen direction
- Include explicit layout structure (header, hero, sections, CTA)
- Specify typography style, color palette, spacing rhythm, and component style
- Keep visual decisions consistent with the vibe scores
- Avoid generic phrasing and vague adjectives

Return:
- A clear visual description suitable for text-to-image generation
- Optional short negative prompt line for undesired traits"""
