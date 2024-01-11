import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const arrayBufferToBase64 = (buffer: any, mimeType: string) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64, ${window.btoa(binary)}`;
}

export const reduceProducts = (data: any[]) => {
  if (!data.length) return [];
  let newArr: any[] = [];
  data.reduce(
    (prev, current) => {
      if (prev.productCode === current.productCode && prev.colors.length > current.colors.length) newArr.push(prev);
      else if (prev.productCode === current.productCode && prev.colors.length < current.colors.length) newArr.push(current);
      return current;
    }
  );
  const uniqueObjects = getUniqueObjects(data, 'productCode');

  for (let index = 0; index < newArr.length; index++) {
    const element = newArr[index];
    const findIdx = uniqueObjects.findIndex(x => x.productCode === element.productCode);
    if (findIdx !== (-1)) uniqueObjects.splice(findIdx, 1);
  }
  return [...newArr, ...uniqueObjects];
}

export const findDuplicateObjects = (array: any[] = [], property: string) => {
  let seen: any = {};
  let duplicates = [];

  for (let i = 0; i < array.length; i++) {
    let currentObject = array[i];
    let key = currentObject[property];

    // If the key is not in the 'seen' object, add it
    if (!seen[key]) {
      seen[key] = 1;
    } else {
      // If the key is already in the 'seen' object, it's a duplicate
      if (seen[key] === 1) {
        duplicates.push(currentObject);
      }
      seen[key]++;
    }
  }

  return duplicates;
}

const getUniqueObjects = (array: any[] = [], property: string) => {
  let seen: any = {};
  let uniqueObjects = [];

  for (let i = 0; i < array.length; i++) {
    let currentObject = array[i];
    let key = currentObject[property];

    // If the key is not in the 'seen' object, add it to 'uniqueObjects'
    if (!seen[key]) {
      seen[key] = true;
      uniqueObjects.push(currentObject);
    }
  }

  return uniqueObjects;
}

export const stringToSlug = (str: string) => {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-');

  return str;
}