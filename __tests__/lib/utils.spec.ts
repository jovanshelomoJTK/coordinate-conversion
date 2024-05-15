import { cn } from '../../src/lib/utils';

describe('cn function', () => {
    it('should return a single string when given multiple class names', () => {
        const result = cn('class1', 'class2', 'class3');
        expect(result).toBe('class1 class2 class3');
    });

    it('should return a single string when given an array of class names', () => {
        const result = cn(['class1', 'class2', 'class3']);
        expect(result).toBe('class1 class2 class3');
    });

    it('should return an empty string when given no class names', () => {
        const result = cn();
        expect(result).toBe('');
    });

    it('should ignore null and undefined values', () => {
        const result = cn('class1', null, 'class2', undefined, 'class3');
        expect(result).toBe('class1 class2 class3');
    });

    it('should ignore non string values', () => {
        const result = cn('class1', false, 'class2', true, 'class3');
        expect(result).toBe('class1 class2 class3');
    });
});