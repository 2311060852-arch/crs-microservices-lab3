import { useEffect } from 'react';
interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}
export default function Toast({ message, type, onClose }:
                              ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [onClose]);
    return (

        <div
            style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                padding: '12px 20px',
                borderRadius: 8,
                color: '#fff',
                backgroundColor: type === 'success' ? '#15803d' : '#b91c1c',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 1000,
            }}
        >
            {message}
            <button
                onClick={onClose}
                style={{ marginLeft: 12, background: 'none', border: 'none',

                    color: '#fff', cursor: 'pointer' }}
            >
                ✕
            </button>
        </div>
    );
}

// path: crs-frontend/src/hooks/useToast.ts
// purpose: hook nho giup goi Toast tu bat ky trang nao ma khong can lap lai state moi lan
import { useState, useCallback } from 'react';
export function useToast() {
    const [toast, setToast] = useState<{ message: string; type:
            'success' | 'error' } | null>(null);
    const showToast = useCallback((message: string, type: 'success' |

        'error') => {
        setToast({ message, type });
    }, []);
    const clearToast = useCallback(() => setToast(null), []);
    return { toast, showToast, clearToast };
}