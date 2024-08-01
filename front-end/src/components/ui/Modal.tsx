import Image from 'next/image';
import React, { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './button';


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: string;
};

const Modal = ({
  open,
  setOpen,
  content
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col justify-between items-center max-sm:w-[80%] max-sm:rounded-md">
        <DialogHeader className='py-6'>
          <h2 className="text-lg ms:text-2xl font-semibold text-black">
            {content}
          </h2>
        </DialogHeader>
        <DialogFooter className="w-full font-flat">
          <DialogClose asChild>
            <Button
              className="w-full border-black text-black capitalize"
              type="button"
              variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
