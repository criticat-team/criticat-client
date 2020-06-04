import { useEventListener } from '@vueuse/core';
import { Key } from 'ts-key-enum';

type EventType = 'keyup' | 'keydown';
type Bindings = {
  [k in Key]?: () => void;
};

export function useKeyboard(bindings: Bindings, eventType: EventType = 'keyup'): void {
  useEventListener(eventType, (event: KeyboardEvent) => {
    if (bindings[event.key] != null) {
      bindings[event.key]();
    }
  });
}
