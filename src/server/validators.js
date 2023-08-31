export function zodValidate(schema, body) {
  const validation = schema.safeParse(body);
  if (validation.success == false) {
    return { zodErr: true, zodMsg: validation.error.issues[0].message };
  }
  return { zodErr: false };
}
