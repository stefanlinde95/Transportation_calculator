import { STEEL, PLASTIC, WOOD, GLASS, CERAMIC } from '../constants/materials';

const MATERIALS = [STEEL, PLASTIC, WOOD, GLASS, CERAMIC];

export const findMaterialPrice = (name: string): number => {
  for (const materials of MATERIALS) {
      const material = materials.find((m:{name:string}) => m.name === name);
      if (material) {
        return material.price
    }
  }
  return 5;
}
