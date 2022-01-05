// https://helpx.adobe.com/after-effects/using//keyboard-shortcuts-reference.html#showing_properties_and_groups_in_the_timeline_panel_keyboard_shortcuts
export enum LayerPropertyFlags {
  None            =  0,
  // A
  Anchor          = 1 << 1,
  // T
  Opacity         = 1 << 2,
  // P
  Position        = 1 << 3,
  // R (& Orientation)
  Rotation        = 1 << 4,
  // S
  Scale           = 1 << 5,
  // L
  AudioLevels     = 1 << 6,
  // F
  MaskFeather     = 1 << 7,
  // M 
  MaskPath        = 1 << 8,
  // TT 
  MaskOpacity     = 1 << 9,
  // RR
  TimeRemap       = 1 << 10,
  // FF 
  MissingEffects  = 1 << 11,
  // E 
  Effects         = 1 << 12,
  // M (mask property groups)
  Masks           = 1 << 13,
  // AA
  MaterialOptions = 1 << 14,
  // EE 
  Expressions     = 1 << 15,
  // U 
  WithKeyframes   = 1 << 16,
  // UU 
  ModifiedProps   = 1 << 17,
  // PP
  PaintStrokes    = 1 << 18,
  // LL 
  AudioWaveform   = 1 << 19,      
  // SS 
  SelectedProps   = 1 << 20,
  // MM
  MaskPropGroups   = 1 << 21,
}