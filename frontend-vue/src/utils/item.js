// utils/item.js
import { ref, provide, inject } from 'vue';

const selectedItemSymbol = Symbol('selectedItem');

export function provideSelectedItem() {
  const selectedItem = ref(null);
  provide(selectedItemSymbol, selectedItem);
}

export function useSelectedItem() {
  const selectedItem = inject(selectedItemSymbol);
  if (!selectedItem) {
    throw new Error('useSelectedItem must be used within a component that provides selectedItem.');
  }
  return selectedItem;
}